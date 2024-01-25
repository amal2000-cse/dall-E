// these are functions that we can reuse later on in the project
import FileSaver from 'file-saver'
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[randomIndex];

    //here we are checking to not to get the same prompt twice
    if(randomPrompt===prompt) return getRandomPrompt(prompt)

    return randomPrompt;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}