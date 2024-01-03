// components/Page.js
"use client"
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList'; // Adjust the path based on the file structure
import TaskForm from '../components/TaskForm';
import ThemeToggle from '../components/ThemeToggle';
import Clock from '../components/Clock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import useSound from 'use-sound';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');
  const [mainTask, setMainTask] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [theme, setTheme] = useState('light');
  const [play] = useSound("/assets/sound/alarm1.mp3");

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Remove the previous theme class
    document.body.classList.remove('light', 'dark');

    // Add the current theme class
    document.body.classList.add(theme);

    if (theme === 'dark') {
      // Apply dark mode styles
    } else {
      // Apply light mode styles
    }

  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      const currentTimeStr = format(currentTime, 'HH:mm');

      mainTask.forEach(task => {
        if (currentTimeStr === task.time && !task.alarmPlayed) {
          playAlarm(task.title);
          setMainTask(prevTasks => {
            return prevTasks.map(prevTask => {
              if (prevTask === task) {
                return { ...prevTask, alarmPlayed: true };
              }
              return prevTask;
            });
          });

          const repeatIntervalId = setInterval(() => {
            playAlarm(task.title);
          }, 30000);

          // Clear the repeating interval after 5 minutes (adjust as needed)
          setTimeout(() => {
            clearInterval(repeatIntervalId);
          }, 300000);
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime, mainTask, play]);

  const playAlarm = (taskTitle) => {
    play();

    toast.success(`⏰ Time for task: ${taskTitle}!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    // Trim whitespace from title and description
    const trimmedTitle = title.trim();
    const trimmedDesc = desc.trim();
  
    if (!trimmedTitle || !trimmedDesc || !hour || !minute) {
      toast.error('Please enter a valid title, description, and time.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
  
    if (!isValidTime()) {
      toast.error('Invalid time. Please enter a valid time.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
  
    setMainTask([...mainTask, { title: trimmedTitle, desc: trimmedDesc, time: getTimeIn24HourFormat() }]);
    setTitle('');
    setDesc('');
    setHour('12');
    setMinute('00');
    setPeriod('AM');
    notify();
  };
  

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
  };

  const notify = () => {
    toast.success('🦄 Your Task is Added!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const isValidTime = () => {
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minute, 10);
    return (
      !isNaN(hourNum) &&
      hourNum >= 1 &&
      hourNum <= 12 &&
      !isNaN(minuteNum) &&
      minuteNum >= 0 &&
      minuteNum <= 59 &&
      (period === 'AM' || period === 'PM')
    );
  };

  const getTimeIn24HourFormat = () => {
    const hour24 = period === 'AM' ? (hour % 12) : (hour % 12) + 12;
    return `${hour24.toString().padStart(2, '0')}:${minute}`;
  };

  const sortedTasks = mainTask.slice().sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a.time}`).getTime();
    const timeB = new Date(`2000-01-01T${b.time}`).getTime();
    return timeA - timeB;
  });

  return (
    <>
      <div className="top-bar">
        <h1 className="bg-black text-white p-5 text-2xl font-bold text-center">Todo List</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <Clock currentTime={currentTime} />

      <TaskForm
        title={title}
        desc={desc}
        hour={hour}
        minute={minute}
        period={period}
        setTitle={setTitle}
        setDesc={setDesc}
        setHour={setHour}
        setMinute={setMinute}
        setPeriod={setPeriod}
        submitHandler={submitHandler}
      />

      <hr />

      <div className="bg-purple-300 p-4">
        <TaskList sortedTasks={sortedTasks} deleteHandler={deleteHandler} />
      </div>

      <ToastContainer />
    </>
  );
};

export default Page;
