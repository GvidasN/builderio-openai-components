import Avatar from "./CustomAvatar";

function Message({ content, role }) {
    return (
        <div
          className={`box-border flex relative flex-row shrink-0 p-3 max-w-xl mt-auto w-auto h-auto text-left rounded-xl border border-solid border-[black] ${
          role == "system" ? "ml-auto" : ""
        }`}
      >
        <Avatar src={role == "system" ? "/system-avatar.png" : "/user-avatar.png"} alt="avatar" />
        <p>{content}</p>
      </div>
    );
}

export default Message;