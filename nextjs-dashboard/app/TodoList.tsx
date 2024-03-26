'use client';

import { KeyboardEvent, useRef, useState, useEffect } from 'react';
import cn from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

export const ToDoList = () => {
  const [todoTask, setTodoTask] = useState([
    'Dentist Appointment at 1:30PM',
    'Grocery shop after work',
  ]);

  interface ColorObject {
    Red: string;
    Black: string;
    Blue: string;
  }

  interface SizeObject {
    Small: string;
    Medium: string;
    Large: string;
  }

  const [fontSize, setFontSize] = useState('Medium');
  const [fontColor, setFontColor] = useState('Black');
  const [checkbox, setCheckbox] = useState('Checkbox');
  const [StyleSelected, setStyleSelected] = useState('default');
  const textColorOption = ['Red', 'Black', 'Blue'];
  const textSizeOption = ['Small', 'Medium', 'Large'];
  const checkBoxOption = ['Strike', 'Checkbox', 'Both'];

  const [mappedData, setMappedData] = useState([
    checkBoxOption,
    textColorOption,
    textSizeOption,
  ]);

  const [currentOption, setCurrentOption] = useState([
    checkbox,
    fontColor,
    fontSize,
  ]);

  const settingStyleChange = [
    {
      Color: {
        Red: 'text-red-700',
        Black: 'text-black',
        Blue: 'text-blue-700',
      },
    },
    { Size: { Small: 'text-sm', Medium: 'text-md', Large: 'text-lg' } },
  ];

  const AddListInput = () => {
    const AddTask = () => {
      setTodoTask((prevTasks) => [...prevTasks, 'Enter New Task Here']);
      console.log("I've been pressed");
    };
    return (
      <button
        className={cn(
          'flex h-10 w-40 flex-row items-center',
          'text-center font-bold text-white',
          'ml-2',
          'rounded-lg bg-blue-500',
          'cursor-pointer duration-100 hover:opacity-80',
        )}
        onClick={(e) => {
          AddTask();
        }}
      >
        <div
          className={cn('text-2xl', 'px-3 py-1', 'rounded-lg', 'bg-blue-400')}
        >
          +
        </div>
        <span className={'px-4 py-2'}>Add Task</span>
      </button>
    );
  };

  const Settings = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    const [popUpSetting, setPopUpSetting] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      console.log('popUpSetting changed:', popUpSetting);
    }, [popUpSetting]);

    return (
      <div>
        <div
          className={cn(
            'flex flex-col items-center justify-center',
            'ml-2 w-40',
            'bg-white',
            'rounded-lg border-2 border-blue-500',
          )}
        >
          <button
            className={cn(
              'shrink-2 flex h-10 w-40 flex-row items-center justify-center',
              'text-center font-bold text-white',
              'rounded-lg bg-blue-500',
              'cursor-pointer duration-100 hover:opacity-80',
            )}
            onClick={() => {
              setIsDropDown(!isDropDown);
              setPopUpSetting(false);
            }}
          >
            <span className={cn('')}>Settings</span>
          </button>
          <div
            className={cn(
              `${
                isDropDown ? 'flex' : 'hidden'
              } flex-col items-center justify-center`,
              'w-40',
            )}
          >
            {popUpSetting ? (
              <>
                {mappedData[selectedIndex].map((item, index) => (
                  <div key={index + item}>
                    <SettingsDropDownOption
                      currentOption={currentOption[selectedIndex]}
                      key={index + item}
                      dropDownText={item}
                      onClick={() => {
                        setPopUpSetting(!popUpSetting);
                        setStyleSelected(item);
                        setCurrentOption([item, fontColor, fontSize]);
                        if (selectedIndex === 0) {
                          setCheckbox(item);
                        } else if (selectedIndex === 1) {
                          setFontColor(item);
                          setCurrentOption([checkbox, item, fontSize]);
                        } else if (selectedIndex === 2) {
                          setFontSize(item);
                          setCurrentOption([checkbox, fontColor, item]);
                          console.log(
                            settingStyleChange[1].Size?.[
                              fontSize as keyof SizeObject
                            ],
                          );
                        }
                        // const [fontSize, setFontSize] = useState('text-md');
                        // const [fontColor, setFontColor] = useState('black');
                        // const [checkbox, setCheckbox] = useState('checkbox');
                      }}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <SettingsDropDownOption
                  dropDownText={'Checkbox'}
                  onClick={() => {
                    setPopUpSetting(!popUpSetting);
                    setSelectedIndex(0);
                  }}
                />
                <SettingsDropDownOption
                  dropDownText={'Text Color'}
                  onClick={() => {
                    setPopUpSetting(!popUpSetting);
                    setSelectedIndex(1);
                  }}
                />
                <SettingsDropDownOption
                  dropDownText={'Text Size'}
                  onClick={() => {
                    setPopUpSetting(!popUpSetting);
                    setSelectedIndex(2);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <ul className={'list-disc'}>
      {todoTask.map((task, index) => (
        <div
          key={task + index}
          className={cn(
            `${settingStyleChange[0].Color?.[fontColor as keyof ColorObject]}`,
          )}
        >
          <CreateListInput
            inputText={task}
            textSize={
              settingStyleChange[1].Size?.[fontSize as keyof SizeObject]
            }
            index={index}
            todoTask={todoTask}
            setTodoTask={setTodoTask}
            checkbox={checkbox}
          />
        </div>
      ))}
      <div className={cn('flex shrink-0 flex-row')}>
        <AddListInput />
        <Settings />
      </div>
    </ul>
  );
};

const SettingsDropDownOption = ({
  dropDownText = '',
  currentOption = '',
  onClick = () => {},
}) => {
  return (
    <button
      className={cn(
        'w-36',
        'shrink-2 my-1 p-1',
        'overflow-hidden',
        'rounded-lg hover:bg-blue-100',
      )}
      onClick={() => {
        onClick();
      }}
    >
      {dropDownText === currentOption ? (
        <div className={cn('just ml-6 flex flex-row justify-center')}>
          {dropDownText} <div className={cn('ml-2')}>✔</div>
        </div>
      ) : (
        dropDownText
      )}
    </button>
  );
};

interface CreateListInputProps {
  checkbox?: string;
  inputText?: string;
  textSize?: string;
  index?: number;
  todoTask: string[];
  setTodoTask: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateListInput: React.FC<CreateListInputProps> = ({
  checkbox = '',
  inputText = '',
  textSize = '',
  index = 0,
  todoTask,
  setTodoTask,
}) => {
  // const handleTextArea = useDebouncedCallback((term) => {
  //   console.log(`Changing to-do list here: ${term}`);
  //   const updatedArray = [...todoTask];
  //   updatedArray[index] = term;
  //   setTodoTask(updatedArray);
  //   console.log('upated after changing textarea ' + todoTask);
  // }, 800);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [checked, setChecked] = useState(false);
  const autoExpand = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    console.log('current scrollheight' + e.currentTarget.style.height);
    console.log(
      'autoExpand current target value is this' + e.currentTarget.value,
    );
  };

  const StrikePencil = () => {
    return (
      <div
        className={cn(
          'ml-3 mr-2 h-6 w-6',
          'text-m text-center font-bold text-green-700',
          'rounded-md border-2 border-transparent',
          'cursor-pointer',
        )}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        ✏️
      </div>
    );
  };

  const CheckBox = () => {
    return (
      <div
        className={cn(
          'ml-3 mr-2 h-6 w-6',
          'text-m text-center font-bold text-green-700',
          'rounded-md border-2 border-solid border-blue-400',
          'cursor-pointer',
        )}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        {checked ? <span className={cn('select-none')}>✔</span> : ''}
      </div>
    );
  };

  return (
    <li className={cn('my-4 flex')}>
      <DeleteTaskButton
        index={index}
        setTodoTask={setTodoTask}
        todoTask={todoTask}
      />
      {checkbox === 'Strike' ? <StrikePencil /> : <CheckBox />}
      <textarea
        maxLength={100}
        ref={textAreaRef}
        defaultValue={inputText}
        placeholder={'Enter a todo'}
        className={cn(
          `${textSize}`,
          `${checked && checkbox !== 'Checkbox' ? 'line-through' : ''}`,
          `w-4/5`,
          'resize-none overflow-hidden',
          'px-1 py-0',
          'bg-gray-50 align-top',
          'rounded-lg border-transparent focus:border-blue-400',
        )}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter') {
            textAreaRef.current?.blur();
            // e.currentTarget.blur();
          }
          return false;
        }}
        // onChange={(e) => handleTextArea(e.target.value)}
        onInput={(e) => autoExpand(e)}
      ></textarea>
    </li>
  );
};

interface DeleteTaskButtontProps {
  index?: number;
  todoTask: string[];
  setTodoTask: React.Dispatch<React.SetStateAction<string[]>>;
}

//DeleteTaskButton

const DeleteTaskButton: React.FC<DeleteTaskButtontProps> = ({
  index = 0,
  todoTask,
  setTodoTask,
}) => {
  const deleteTask = (index: number) => {
    const newList = [...todoTask];
    newList.splice(index, 1);
    setTodoTask(newList);
  };
  return (
    <button
      className={cn(
        'ml-3 h-6 w-6',
        'font-bold text-white',
        'rounded-md border-solid bg-red-500',
        'hover:bg-red-700',
      )}
      onClick={(e) => {
        deleteTask(index);
      }}
    >
      x
    </button>
  );
};
