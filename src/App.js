import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';


function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends React.Component {
  state = {
    store: STORE,
  }

  onDeleteItem = (item) => {
    const obj = this.state.store.allCards
    const deleteItem = item.id
    const lists = this.state.store.lists
    const newCards = omit(obj, deleteItem)
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== deleteItem)
    }))
    console.log(newCards)

    this.setState({
      store: {
      allCards: newCards,
      lists: newLists
      }
    })
  }

  addRandomCard = (id) => {
    const randomCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if (this.state.store.lists.id === id) {
	return {
          ...list,
          cardIds: [...list.cardIds, randomCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [randomCard.id]: randomCard
        }
      }
    })
  };




  render() {
    console.log(this.props)
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteItem={this.onDeleteItem}
              addRandomCard={this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;