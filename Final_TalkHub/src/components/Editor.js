import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/midnight.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/search/jump-to-line";
import ACTIONS from "../Actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "python", json: true },
          theme: "material-palenight",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          // fullScreen: true,
          autofocus: true,
          value: "Hello World",
          indentUnit: 2,
          smartIndent: true,
          lineWrapping: true,
          inputStyle: "contenteditable",
          lineWiseCopyCut: true,
          pasteLinesPerSelection: true,
          dragDrop: true,
          cursorBlinkRate: 25,
          cursorHeight: 1,
          autocorrect: true,
          search: true,
        }
      );
      editorRef.current.setValue(
        '/* The Area For Your Code To Be Discussed 👇 */\n\n# QuickSort in Python\ndef Partition(array , low , high):\n\t# Your Code need to include here\n\ndef QuickSort(array , low , high):\n\t# Your Code need to include here\n\ndata = [8, 7, 2, 1, 0, 9, 6]\nprint("Unsorted Array")\nprint(data\n\nsize = len(data)\nQuickSort(data , 0 , size-1)\n\nprint("Sorted Array in Ascending Order")\nprint(data)'
      );
      // editorRef.current.setValue(
      //   "import sys\nprint('This message will be displayed on the screen.')\noriginal_stdout = sys.stdout \n# Save a reference to the original standard output\nwith open('filename.txt', 'w') as f:\n\tsys.stdout = f \n# Change the standard output to the file we created.\n\tprint('This message will be written to a file.')\n\tsys.stdout = original_stdout \n# Reset the standard output to its original value"
      // );
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <textarea
      className="syncCodeeditor"
      id="realtimeEditor"
      spellCheck="false"
    ></textarea>
  );
};

export default Editor;
