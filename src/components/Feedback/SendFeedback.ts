import { Feedback, Sentiment } from '../../Feedback';
import { RootState } from '../Root';

// import fs from 'fs';

const sendFeedback = (rootState: RootState, callback: (result: string, success: boolean) => void) => {
  
  // TODO: figure out where this data should go on a permanent basis
  const feedback = rootState.feedback;

  // minor form checking
  if (feedback.feedback === '') {
    callback('Please supply some feedback!', false);
    return;
  }
  if (feedback.sentiment === Sentiment.None) {
    callback('Please select how you feel about the simulator!', false);
    return;
  }

  // build a string to send to discord. File sending currently not working
  let sentiment: string;
  switch (feedback.sentiment) {
    case Sentiment.Happy : sentiment = 'Happy'; break;
    case Sentiment.Okay : sentiment = 'Okay'; break;
    case Sentiment.Sad : sentiment = 'Sad'; break;
  }

  // send to a discord webhook
  const formData = new FormData();

  let content = `User Feedback Recieved:\n\`\`\`${feedback.feedback} \`\`\`\n`;
  content += `Sentiment: ${sentiment}\n`;
  if (feedback.email !== '') {
    content += `User Email: ${feedback.email}`;
  }

  if (feedback.includeAnonData) {
    content += `User Code:\n\`\`\`${rootState.code}\`\`\`\n`;
    // content += `Robot State:\n ${}`;
    // content += `Surface State:\n ${}`;
    content += `Browser User-Agent: ${window.navigator.userAgent}\n`;
    
    formData.append("file", new File(
      [ 
        new Blob([JSON.stringify(rootState)], { type: 'application/json', })
      ],
      'userdata.json'
    ));
  }

  formData.append('username', 'KIPR Simulator Feedback');
  formData.append('avatar_url', 'https://www.kipr.org/wp-content/uploads/2018/08/botguy-copy.jpg');
  formData.append('content', content);

  const request = new Request(
    'https://discord.com/api/webhooks/931769619025379388/mZo-3RGXUYfN2DG9zV7u2ljnNUfyIJXFtNfh88T7QURew3_ISbAnntZ0Tml8TpEFBSTE',
    {
      method: 'POST', 
      body: formData
    }
  );

  fetch(request)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        callback('Feedback sent, thank you!', true);
      } else {
        callback('Error sending feedback, please try again', false);
      }
    })
    .catch(() => {
      callback('Error sending feedback, please try again', false);
    });
};

export default sendFeedback;