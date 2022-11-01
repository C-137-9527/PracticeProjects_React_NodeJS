import styles from './ChatWindow.module.css';

import Conversation from './Conversation';

const ChatWindow = () => {
  return (
    <div className={styles.chatWindow}>
      {/* sidebar */}
      <div className={styles.sidebar}>
        {/* header */}
        <header>
          <p>Chat App</p>
          <div>
            <img src='' alt='avatar' />
            <p>alvin</p>
            <button>logout</button>
          </div>
        </header>

        {/* search for friend */}
        <input type='text' placeholder='Find a user' />

        {/* friends list */}
        <ul></ul>
      </div>

      {/* active conversation */}
      <Conversation />
    </div>
  );
};

export default ChatWindow;
