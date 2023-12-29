import { Kurssit } from './components/Courses.js';
import { Memo } from './components/Memos.js';
import { get } from 'svelte/store';

Kurssit.useLocalStorage();
Memo.useLocalStorage();

fetch ( 'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/Memo')
  .then(response => response.json())
  .then(data => {

    if(Array.isArray(data))
    {
      data.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"text\",\"course\",\"timestamp\"]")
        {
          data.splice(index,1);
        }
      })
    }

    let notes = get(Memo);

    if(Array.isArray(Memo))
    {
      notes.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"text\",\"course\",\"timestamp\"]")
        {
          notes.splice(index,1);
        }
      })
    }
    
    if(!Array.isArray(notes)) 
    {
      Memo.set(data);
    } 
    else if(Array.isArray(data))
    {
      data.forEach((item) => {
        if(!notes.some(dict => JSON.stringify(dict) === JSON.stringify(item)))
        {
          notes.push(item);
        }
      })
      Memo.set(notes);
    }
  })
  .catch(error => {
    if(!get(Memo)) Memo.set([]);
  });

fetch ( 'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/courses')
  .then(response => response.json())
  .then(data => {

    if(Array.isArray(data))
    {
      data.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"name\"]")
        {
          data.splice(index,1);
        }
      })
    }

    let courses = get(Kurssit);

    if(Array.isArray(courses))
    {
      courses.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"name\"]")
        {
          courses.splice(index,1);
        }
      })
    }

    if(!Array.isArray(courses)) 
    {
      Kurssit.set(data);
    } 
    else if(Array.isArray(data))
    {
      data.forEach((item) => {
        if(!courses.some(dict => JSON.stringify(dict) === JSON.stringify(item)))
        {
          courses.push(item);
        }
      })
      Kurssit.set(courses);
    }
  })
  .catch(error => {
    if(!get(Kurssit)) Kurssit.set([]);
  });