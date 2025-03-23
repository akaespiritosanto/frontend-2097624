import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const NewPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => setDataList(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <h1>New Page</h1>
            <input 
                type="text" 
                onInput={handleInput} 
                placeholder="Type something..."
            />
            <p id="output">You typed: {inputValue}</p>            
            <ul>
                {dataList.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>

            {inputValue === '' && <p>Please type something!</p>}
            {inputValue === 'hello' && <p>Hello there! You typed the magic word!</p>}
        </div>
    );
};

export default NewPage;
