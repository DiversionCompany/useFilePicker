import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFilePicker } from '../src';

const App = () => {
  const [filesContent, errors, openFileSelector, loading] = useFilePicker({
    multiple: true,
    readAs: 'Text', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
    // accept: '.ics,.pdf',
    accept: ['.json', '.pdf'],
    limitFilesConfig: { min: 2, max: 3 },
  });

  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFileSelector()}>Something went wrong, retry! </button>
        {errors[0].fileSizeTooSmall && 'File size is too small!'}
        {errors[0].fileSizeToolarge && 'File size is too large!'}
        {errors[0].readerError && 'Problem occured while reading file!'}
        {errors[0].maxLimitExceeded && 'Too many files'}
        {errors[0].minLimitNotReached && 'Not enought files'}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFileSelector()}>Select file </button>
      <br />
      Number of selected files:
      {filesContent.length}
      <br />
      {!!filesContent.length && <img src={filesContent[0].content} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
