import React from "react";
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

const ShareButton = ({ url, title, description }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
    setShowMenu(false);
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: "hover:bg-sky-50",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-[#F68B84] text-[#E27872] rounded-lg hover:bg-[#FFF7E5] transition-all"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3 ${option.color} transition-colors first:rounded-t-lg border-b border-gray-100`}
                onClick={() => setShowMenu(false)}
              >
                {option.icon}
                <span className="text-sm text-gray-700">{option.name}</span>
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-50 transition-colors rounded-b-lg"
            >
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm text-gray-700">Copy Link</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;