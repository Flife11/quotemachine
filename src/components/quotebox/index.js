import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { AiFillTwitterSquare } from 'react-icons/ai';
import { FaQuoteLeft, FaTumblrSquare } from 'react-icons/fa';

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

async function getQuote() {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    return await fetch(url);
}

function QuoteBox({setColor}) {

    const [data, setData] = useState({quotes: []});
    const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random()*data.quotes.length));
    const [colorIndex, setColorIndex] = useState(Math.floor(Math.random()*12));

    useEffect(() => {
        async function fetchData() {
            const jsonData = await getQuote();
            const data = await jsonData.json();
            
            setData(data);
            setQuoteIndex(Math.floor(Math.random()*data.quotes.length));
            setColorIndex(Math.floor(Math.random()*12));
        }

        fetchData().catch(console.error);
    }
    , []);

    return (
        <div id={styles.background} style={{color: colors[colorIndex], backgroundColor: colors[colorIndex]}}>
            <div id={styles['quote-box']}>
                {data.quotes.length!=0 && <p id={styles.text}><FaQuoteLeft className={styles.textIcon} icon="fa-solid fa-quote-left" />{data.quotes[quoteIndex].quote}</p>}
                {data.quotes.length!=0 && <p id={styles.author}>-{data.quotes[quoteIndex].author}</p>}
                <div id={styles.buttonContainer}>
                    <div>
                        <a href='twitter.com/intent/tweet' target="_blank"><AiFillTwitterSquare className={styles.icon} icon="fa-brands fa-square-twitter" style={{color: colors[colorIndex]}}/></a>
                        <a href='twitter.com/intent/tweet'><FaTumblrSquare className={styles.icon} icon="fa-brands fa-square-tumblr" style={{color: colors[colorIndex]}}/></a>
                    </div>
                    <button
                        onClick={() => {
                                setQuoteIndex(Math.floor(Math.random()*data.quotes.length));
                                setColorIndex(Math.floor(Math.random()*12));
                            }
                        }
                        id={styles['new-quote']}
                        style={{backgroundColor: colors[colorIndex]}}
                        >

                        New quote
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default QuoteBox;