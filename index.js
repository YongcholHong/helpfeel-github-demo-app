import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleExecute = async () => {
    try {
      console.log(inputValue);
      const response = await axios.get(
        `https://api.github.com/repos/YongcholHong/helpfeel-github-demo-app/${inputValue === 'issues' ? 'issues' : 'pulls'}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      //console.log(inputValue);
      const titles = response.data.map((item) => item.title);
      setOutputValue(titles.join(', '));
    } catch (error) {
      console.error(error);
      setOutputValue('Error occurred while fetching data');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleExecute}>Execute</button>
      <div>{outputValue}</div>
    </div>
  );
}