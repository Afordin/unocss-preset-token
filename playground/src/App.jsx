import { useRef } from 'react';
import Monaco from '@monaco-editor/react';
import { toast } from 'sonner';

import { Editor, Button } from './components';
import transform from './transform';

function App() {
  const previewRef = useRef(null);

  function handlePreviewDidMount(editor, monaco) {
    previewRef.current = editor;
  }
  function handlerValuePreview(value) {
    if (value.trim()) {
      const _transform = transform(value);
      previewRef.current.setValue(JSON.stringify(_transform, null, '\t'));
    } else {
      previewRef.current.setValue('{}');
    }
  }

  function handlerCopy() {
    const value = previewRef.current.getValue();
    navigator.clipboard.writeText(value);
    toast.success('Copiado en el cortapapeles');
  }

  return (
    <div className="grid grid-cols-2 w-screen h-screen bg-dark p-5">
      <Editor onPreview={handlerValuePreview} />

      <div className="flex flex-col">
        <Monaco
          className="flex h-full"
          wrapperProps={{ style: { flex: 1 } }}
          defaultLanguage="json"
          defaultValue="{}"
          theme="vs-dark"
          onMount={handlePreviewDidMount}
          loading={<p className="text-white">Cargando...</p>}
          options={{
            readOnly: true,
            autoIndent: true,
          }}
        />
        <Button onClick={handlerCopy}>Copiar</Button>
      </div>
    </div>
  );
}

export default App;
