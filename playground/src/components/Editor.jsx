import { useRef } from 'react';
import Monaco from '@monaco-editor/react';

const Editor = ({ onPreview }) => {
  const editorRef = useRef(null);
  const timeout = useRef();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = { editor, monaco };
  }

  function onChangeEditor(value) {
    clearTimeout(timeout.current);

    const { monaco } = editorRef.current;

    timeout.current = setTimeout(() => {
      if (monaco.editor.getModelMarkers({ owner: 'json' }).length === 0) {
        onPreview(value);
      } else {
        onPreview('{}');
      }

      clearTimeout(timeout.current);
    }, 1000);
  }

  return (
    <Monaco
      defaultLanguage="json"
      defaultValue="{}"
      theme="vs-dark"
      onMount={handleEditorDidMount}
      onChange={onChangeEditor}
      loading={<p className="text-white">Cargando...</p>}
      options={{
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
};

export default Editor;
