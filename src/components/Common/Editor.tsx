import { Note } from "@/types";
import { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type Props = {
  isAuthor: boolean;
  post: Note;
  setPost: (payload: Note) => void;
};

export const Editor: FC<Props> = ({ isAuthor, post, setPost }) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <>
      <div className="max-w-[720px] mx-auto pt-16 pb-48 px-5">
        <h1 className="text-2xl md:text-4xl">
          {!isAuthor ? (
            <span className="inline-block w-full leading-snug font-bold ">{post.name}</span>
          ) : (
            <TextareaAutosize
              value={post.name}
              minRows={1}
              placeholder="タイトル"
              className="w-full leading-snug font-bold outline-none resize-none"
              onChange={(e) => {
                setPost({ ...post, name: e.target.value });
              }}
            />
          )}
        </h1>
        <div className="mt-10">
          {isPreview ? (
            <ReactMarkdown
              className="markdownContent"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {post.content}
            </ReactMarkdown>
          ) : (
            <TextareaAutosize
              value={post.content}
              minRows={6}
              placeholder={`${isAuthor ? "内容を入力してください" : ""}`}
              className="w-full outline-none resize-none px-1 leading-8"
              onChange={(e) => {
                isAuthor ? setPost({ ...post, content: e.target.value }) : null;
              }}
            />
          )}
        </div>
      </div>
      <div className="fixed right-5 bottom-4 flex text-sm border justify-start w-fit rounded overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(false);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-white" : "bg-[#e2e9f0] pointer-events-none"}`}
        >
          編集モード
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(true);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-[#e2e9f0] pointer-events-none" : "bg-white"}`}
        >
          プレビュー
        </button>
      </div>
    </>
  );
};
