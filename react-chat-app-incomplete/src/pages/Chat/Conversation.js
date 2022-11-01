import styles from './Conversation.module.css';
import { AiFillVideoCamera } from 'react-icons/ai';
import { FaUserPlus } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ImAttachment } from 'react-icons/im';

const Conversation = () => {
  return (
    <div className={styles.conversation}>
      {/* no active conversation message */}
      <h2>Choose a chat to start the conversation</h2>

      {/* active conversation */}
      <div className={styles.activeConversationWindow}>
        {/* toolbar */}
        <div className={styles.toolbar}>
          <h3>friend</h3>
          <div>
            <AiFillVideoCamera />
            <FaUserPlus />
            <FiMoreHorizontal />
          </div>
        </div>

        {/* messages list */}
        <ul className={styles.messagesList}></ul>

        {/* new message */}
        <div className={styles.newMessage}>
          <input type='text' placeholder='Enter your message' />

          <label>
            <ImAttachment />
            <input type='file' />
          </label>

          <button>send</button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
