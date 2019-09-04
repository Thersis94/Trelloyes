import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List
        key={[1]}
        header={['Hello']}
        cards={['BoilerPlate']}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer
        .create(<List
            key={[1, 2, 3]}
            header={['Hello']}
            cards={['BoilerPlate']}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});