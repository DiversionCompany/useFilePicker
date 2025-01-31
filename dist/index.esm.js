import { _ as _asyncToGenerator, a as _regeneratorRuntime, b as _extends, c as _objectDestructuringEmpty } from './_rollupPluginBabelHelpers-4e04b055.js';
import { useState, useCallback } from 'react';
import { fromEvent } from 'file-selector';

function openFileDialog(accept, multiple, directory, callback, initializeWithCustomAttributes) {
  // this function must be called from a user
  // activation event (ie an onclick event)
  // Create an input element
  var inputElement = document.createElement('input');
  // Hide element and append to body (required to run on iOS safari)
  inputElement.style.display = 'none';
  document.body.appendChild(inputElement);
  // Set its type to file
  inputElement.type = 'file';
  if (directory) {
    inputElement.webkitdirectory = true;
  }
  // Set accept to the file types you want the user to select.
  // Include both the file extension and the mime type
  // if accept is "*" then dont set the accept attribute
  if (accept !== '*') inputElement.accept = accept;
  // Accept multiple files
  inputElement.multiple = multiple;
  // set onchange event to call callback when user has selected file
  //inputElement.addEventListener('change', callback);
  inputElement.addEventListener('change', function (arg) {
    callback(arg);
    // remove element
    document.body.removeChild(inputElement);
  });
  if (initializeWithCustomAttributes) {
    initializeWithCustomAttributes(inputElement);
  }
  // dispatch a click event to open the file dialog
  inputElement.dispatchEvent(new MouseEvent('click'));
}

var useValidators = function useValidators(_ref) {
  var onFilesSelectedProp = _ref.onFilesSelected,
    onFilesSuccessfullySelectedProp = _ref.onFilesSuccessfullySelected,
    onFilesRejectedProp = _ref.onFilesRejected,
    onClearProp = _ref.onClear,
    validators = _ref.validators;
  // setup validators' event handlers
  var onFilesSelected = function onFilesSelected(data) {
    onFilesSelectedProp == null ? void 0 : onFilesSelectedProp(data);
    validators == null ? void 0 : validators.forEach(function (validator) {
      validator.onFilesSelected(data);
    });
  };
  var onFilesSuccessfullySelected = function onFilesSuccessfullySelected(data) {
    onFilesSuccessfullySelectedProp == null ? void 0 : onFilesSuccessfullySelectedProp(data);
    validators == null ? void 0 : validators.forEach(function (validator) {
      validator.onFilesSuccessfullySelected(data);
    });
  };
  var onFilesRejected = function onFilesRejected(errors) {
    onFilesRejectedProp == null ? void 0 : onFilesRejectedProp(errors);
    validators == null ? void 0 : validators.forEach(function (validator) {
      validator.onFilesRejected(errors);
    });
  };
  var onClear = function onClear() {
    onClearProp == null ? void 0 : onClearProp();
    validators == null ? void 0 : validators.forEach(function (validator) {
      validator.onClear == null ? void 0 : validator.onClear();
    });
  };
  return {
    onFilesSelected: onFilesSelected,
    onFilesSuccessfullySelected: onFilesSuccessfullySelected,
    onFilesRejected: onFilesRejected,
    onClear: onClear
  };
};

function useFilePicker(props) {
  var _props$accept = props.accept,
    accept = _props$accept === void 0 ? '*' : _props$accept,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? true : _props$multiple,
    _props$readAs = props.readAs,
    readAs = _props$readAs === void 0 ? 'Text' : _props$readAs,
    _props$readFilesConte = props.readFilesContent,
    readFilesContent = _props$readFilesConte === void 0 ? true : _props$readFilesConte,
    _props$validators = props.validators,
    validators = _props$validators === void 0 ? [] : _props$validators,
    initializeWithCustomParameters = props.initializeWithCustomParameters,
    _props$directory = props.directory,
    directory = _props$directory === void 0 ? false : _props$directory;
  var _useState = useState([]),
    plainFiles = _useState[0],
    setPlainFiles = _useState[1];
  var _useState2 = useState([]),
    filesContent = _useState2[0],
    setFilesContent = _useState2[1];
  var _useState3 = useState([]),
    fileErrors = _useState3[0],
    setFileErrors = _useState3[1];
  var _useState4 = useState(false),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useValidators = useValidators(props),
    onFilesSelected = _useValidators.onFilesSelected,
    onFilesSuccessfullySelected = _useValidators.onFilesSuccessfullySelected,
    onFilesRejected = _useValidators.onFilesRejected,
    onClear = _useValidators.onClear;
  var clear = useCallback(function () {
    setPlainFiles([]);
    setFilesContent([]);
    setFileErrors([]);
  }, []);
  var clearWithEventListener = useCallback(function () {
    clear();
    onClear == null ? void 0 : onClear();
  }, [clear, onClear]);
  var parseFile = function parseFile(file) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
        var reader, readStrategy, addError;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              reader = new FileReader(); //availible reader methods: readAsText, readAsBinaryString, readAsArrayBuffer, readAsDataURL
              readStrategy = reader["readAs" + readAs];
              readStrategy.call(reader, file);
              addError = function addError(_ref2) {
                var others = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
                reject(_extends({}, others));
              };
              reader.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", Promise.all(validators.map(function (validator) {
                        return validator.validateAfterParsing(props, file, reader)["catch"](function (err) {
                          return Promise.reject(addError(err));
                        });
                      })).then(function () {
                        return resolve(_extends({}, file, {
                          content: reader.result,
                          name: file.name,
                          lastModified: file.lastModified
                        }));
                      })["catch"](function () {}));
                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              reader.onerror = function () {
                addError({
                  name: 'FileReaderError',
                  readerError: reader.error,
                  causedByFile: file
                });
              };
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
  var openFilePicker = function openFilePicker(args) {
    var fileExtensions = accept instanceof Array ? accept.join(',') : accept;
    openFileDialog(fileExtensions, (args == null ? void 0 : args.multiple) !== undefined ? args.multiple : multiple, (args == null ? void 0 : args.directory) !== undefined ? args.directory : directory, /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(evt) {
        var inputElement, plainFileObjects, validationsBeforeParsing, files, validationsAfterParsing, filesContent;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              clear();
              inputElement = evt.target;
              plainFileObjects = inputElement.files ? Array.from(inputElement.files) : [];
              setLoading(true);
              _context3.next = 6;
              return Promise.all(validators.map(function (validator) {
                return validator.validateBeforeParsing(props, plainFileObjects)["catch"](function (err) {
                  return Array.isArray(err) ? err : [err];
                });
              }));
            case 6:
              validationsBeforeParsing = _context3.sent.flat(1).filter(Boolean);
              setPlainFiles(plainFileObjects);
              setFileErrors(validationsBeforeParsing);
              if (!validationsBeforeParsing.length) {
                _context3.next = 15;
                break;
              }
              setLoading(false);
              setPlainFiles([]);
              onFilesRejected == null ? void 0 : onFilesRejected({
                errors: validationsBeforeParsing
              });
              onFilesSelected == null ? void 0 : onFilesSelected({
                errors: validationsBeforeParsing
              });
              return _context3.abrupt("return");
            case 15:
              if (readFilesContent) {
                _context3.next = 19;
                break;
              }
              setLoading(false);
              onFilesSelected == null ? void 0 : onFilesSelected({
                plainFiles: plainFileObjects,
                filesContent: []
              });
              return _context3.abrupt("return");
            case 19:
              _context3.next = 21;
              return fromEvent(evt);
            case 21:
              files = _context3.sent;
              validationsAfterParsing = [];
              _context3.next = 25;
              return Promise.all(files.map(function (file) {
                return parseFile(file)["catch"](function (fileError) {
                  validationsAfterParsing.push.apply(validationsAfterParsing, Array.isArray(fileError) ? fileError : [fileError]);
                });
              }));
            case 25:
              filesContent = _context3.sent;
              setLoading(false);
              if (!validationsAfterParsing.length) {
                _context3.next = 34;
                break;
              }
              setPlainFiles([]);
              setFilesContent([]);
              setFileErrors(function (errors) {
                return [].concat(errors, validationsAfterParsing);
              });
              onFilesRejected == null ? void 0 : onFilesRejected({
                errors: validationsAfterParsing
              });
              onFilesSelected == null ? void 0 : onFilesSelected({
                errors: validationsBeforeParsing.concat(validationsAfterParsing)
              });
              return _context3.abrupt("return");
            case 34:
              setFilesContent(filesContent);
              setPlainFiles(plainFileObjects);
              setFileErrors([]);
              onFilesSuccessfullySelected == null ? void 0 : onFilesSuccessfullySelected({
                filesContent: filesContent,
                plainFiles: plainFileObjects
              });
              onFilesSelected == null ? void 0 : onFilesSelected({
                plainFiles: plainFileObjects,
                filesContent: filesContent
              });
            case 39:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }(), initializeWithCustomParameters);
  };
  return {
    openFilePicker: openFilePicker,
    filesContent: filesContent,
    errors: fileErrors,
    loading: loading,
    plainFiles: plainFiles,
    clear: clearWithEventListener
  };
}

/**
 * A version of useFilePicker hook that keeps selected files between selections. On top of that it allows to remove files from the selection.
 */
function useImperativeFilePicker(props) {
  var _onFilesSelected = props.onFilesSelected,
    _onFilesSuccessfullySelected = props.onFilesSuccessfullySelected,
    validators = props.validators,
    onFileRemoved = props.onFileRemoved;
  var _useState = useState([]),
    allPlainFiles = _useState[0],
    setAllPlainFiles = _useState[1];
  var _useState2 = useState([]),
    allFilesContent = _useState2[0],
    setAllFilesContent = _useState2[1];
  var _useFilePicker = useFilePicker(_extends({}, props, {
      onFilesSelected: function onFilesSelected(data) {
        var _data$errors;
        if (!_onFilesSelected) return;
        if ((_data$errors = data.errors) != null && _data$errors.length) {
          return _onFilesSelected(data);
        }
        // override the files property to return all files that were selected previously and in the current batch
        _onFilesSelected({
          errors: undefined,
          plainFiles: [].concat(allPlainFiles, data.plainFiles || []),
          filesContent: [].concat(allFilesContent, data.filesContent || [])
        });
      },
      onFilesSuccessfullySelected: function onFilesSuccessfullySelected(data) {
        setAllPlainFiles(function (previousPlainFiles) {
          return previousPlainFiles.concat(data.plainFiles);
        });
        setAllFilesContent(function (previousFilesContent) {
          return previousFilesContent.concat(data.filesContent);
        });
        if (!_onFilesSuccessfullySelected) return;
        // override the files property to return all files that were selected previously and in the current batch
        _onFilesSuccessfullySelected({
          plainFiles: [].concat(allPlainFiles, data.plainFiles || []),
          filesContent: [].concat(allFilesContent, data.filesContent || [])
        });
      }
    })),
    openFilePicker = _useFilePicker.openFilePicker,
    loading = _useFilePicker.loading,
    errors = _useFilePicker.errors,
    clear = _useFilePicker.clear;
  var clearAll = useCallback(function () {
    clear();
    // clear previous files
    setAllPlainFiles([]);
    setAllFilesContent([]);
  }, [clear]);
  var removeFileByIndex = useCallback(function (index) {
    setAllFilesContent(function (previousFilesContent) {
      return [].concat(previousFilesContent.slice(0, index), previousFilesContent.slice(index + 1));
    });
    setAllPlainFiles(function (previousPlainFiles) {
      var removedFile = previousPlainFiles[index];
      validators == null ? void 0 : validators.forEach(function (validator) {
        return validator.onFileRemoved == null ? void 0 : validator.onFileRemoved(removedFile, index);
      });
      onFileRemoved == null ? void 0 : onFileRemoved(removedFile, index);
      return [].concat(previousPlainFiles.slice(0, index), previousPlainFiles.slice(index + 1));
    });
  }, [validators, onFileRemoved]);
  var removeFileByReference = useCallback(function (file) {
    var index = allPlainFiles.findIndex(function (f) {
      return f === file;
    });
    if (index === -1) return;
    removeFileByIndex(index);
  }, [removeFileByIndex, allPlainFiles]);
  return {
    openFilePicker: openFilePicker,
    plainFiles: allPlainFiles,
    filesContent: allFilesContent,
    loading: loading,
    errors: errors,
    clear: clearAll,
    removeFileByIndex: removeFileByIndex,
    removeFileByReference: removeFileByReference
  };
}

export { useFilePicker, useImperativeFilePicker };
//# sourceMappingURL=index.esm.js.map
