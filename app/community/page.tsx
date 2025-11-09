"use client";

import Header from "@/components/home/Header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircleMore, Send, AlertCircle, Info, MessageSquare, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type PostCategory = "Issue" | "Info" | "Comment" | "Question";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string | null;
    email: string;
    image: string | null;
  };
  createdAt: Date;
}

interface Post {
  id: string;
  content: string;
  category: PostCategory;
  author: {
    name: string | null;
    email: string;
    image: string | null;
  };
  createdAt: Date;
  comments: Comment[];
}

const categoryIcons = {
  Issue: AlertCircle,
  Info: Info,
  Comment: MessageSquare,
  Question: HelpCircle,
};

const categoryColors = {
  Issue: "text-red-400 bg-red-400/10 border-red-400/20",
  Info: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Comment: "text-green-400 bg-green-400/10 border-green-400/20",
  Question: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function CommunityPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("Comment");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !session?.user) return;

    setIsSubmitting(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPost: Post = {
      id: Date.now().toString(),
      content: content.trim(),
      category,
      author: {
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
      },
      createdAt: new Date(),
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setContent("");
    setCategory("Comment");
    setIsSubmitting(false);
  };

  const handleAddComment = async (postId: string) => {
    if (!commentContent.trim() || !session?.user) return;

    setIsSubmittingComment(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentContent.trim(),
      author: {
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
      },
      createdAt: new Date(),
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    if (selectedPost?.id === postId) {
      setSelectedPost({
        ...selectedPost,
        comments: [...selectedPost.comments, newComment],
      });
    }

    setCommentContent("");
    setIsSubmittingComment(false);
  };

  const getUserInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const selectedPostCategoryIcon = selectedPost
    ? categoryIcons[selectedPost.category]
    : null;

  return (
    <>
      <Header headerText="Community" noHomeLink />
      <div className="pt-20 mx-6 min-h-screen flex flex-col items-center pb-10">
        <div className="mb-6 gap-2 text-center">
          <h1 className="text-lg sm:text-2xl robik font-semibold text-[var(--foreground)]">
            Community Posts
          </h1>
          <span className="opacity-65 flex items-center w-full text-center text-[var(--muted-foreground)]">
            Explore posts and discussions from our vibrant community.
          </span>
        </div>

        {/* Post Form - Only visible when logged in */}
        {session?.user ? (
          <Card className="w-full max-w-3xl  mx-auto mb-6 bg-zinc-950 border-zinc-800 shadow-lg sm:fixed z-10">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-x-4 flex flex-col sm:flex-row">
                <div className="space-y-4 w-30">
                  <Label htmlFor="category" className="text-[var(--foreground)]">
                    Category
                  </Label>
                  <Select

                    value={category}
                    onValueChange={(value) => setCategory(value as PostCategory)}
                  >
                    <SelectTrigger className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--popover)] border-[var(--border)]">
                      <SelectItem value="Issue" className="text-[var(--foreground)] focus:bg-[var(--accent)]">
                        Issue
                      </SelectItem>
                      <SelectItem value="Info" className="text-[var(--foreground)] focus:bg-[var(--accent)]">
                        Info
                      </SelectItem>
                      <SelectItem value="Comment" className="text-[var(--foreground)] focus:bg-[var(--accent)]">
                        Comment
                      </SelectItem>
                      <SelectItem value="Question" className="text-[var(--foreground)] focus:bg-[var(--accent)]">
                        Question
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 flex items-center">

                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, ask questions, or report issues..."
                    value={content}
                    rows={0}
                    onChange={(e) => setContent(e.target.value)}
                    className="max-h-[100px] w-[360px] flex-1 flex bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!content.trim() || isSubmitting}
                  className=" bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 mt-5"
                >
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Confirm Post
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-3xl mx-auto mb-6 bg-zinc-950 border-zinc-800 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-[var(--muted-foreground)] mb-6">
                <MessageCircleMore className="inline w-5 h-5 mr-2 mb-1 text-[var(--muted-foreground)]" />
                Join the conversation, share your experiences, and learn from others in the field of computer network simulation.
              </p>
              <div className="flex justify-center">
                <Link href="/login">
                  <Button
                    variant="secondary"
                    className="text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary)]/90 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        <div className="w-full max-w-3xl mx-auto space-y-4 md:mt-20">
          {posts.length === 0 ? (
            <Card className="w-full bg-zinc-950 border-zinc-800 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-[var(--muted-foreground)] text-center py-8">
                  No posts yet. Be the first to share something!
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => {
              const CategoryIcon = categoryIcons[post.category];
              return (
                <Card
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="w-full bg-zinc-950 border-zinc-800 shadow-lg hover:bg-zinc-900 active:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="size-10 ring-2 ring-zinc-700">
                        <AvatarImage
                          src={post.author.image || undefined}
                          alt={post.author.name || post.author.email}
                        />
                        <AvatarFallback className="bg-[var(--muted)] text-[var(--foreground)] text-sm">
                          {getUserInitials(post.author.name, post.author.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[var(--foreground)] font-medium text-sm">
                            {post.author.name || post.author.email}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${categoryColors[post.category]}`}
                          >
                            <CategoryIcon className="w-3 h-3" />
                            {post.category}
                          </span>
                          <span className="text-[var(--muted-foreground)] text-sm">
                            {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-[var(--foreground)] whitespace-pre-wrap text-xl">
                          {post.content}
                        </p>
                        {post.comments.length > 0 && (
                          <p className="text-[var(--muted-foreground)] text-sm mt-2">
                            {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Post Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="bg-[var(--popover)] border-[var(--border)] text-[var(--foreground)] max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPost && selectedPostCategoryIcon && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 ring-2 ring-zinc-700">
                    <AvatarImage
                      src={selectedPost.author.image || undefined}
                      alt={selectedPost.author.name || selectedPost.author.email}
                    />
                    <AvatarFallback className="bg-[var(--muted)] text-[var(--foreground)]">
                      {getUserInitials(selectedPost.author.name, selectedPost.author.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-left text-[var(--foreground)]">
                      {selectedPost.author.name || selectedPost.author.email}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${categoryColors[selectedPost.category]}`}
                      >
                        {React.createElement(selectedPostCategoryIcon, {
                          className: "w-3 h-3",
                        })}
                        {selectedPost.category}
                      </span>
                      <span className="text-[var(--muted-foreground)] text-xs">
                        {new Date(selectedPost.createdAt).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                  <p className="text-[var(--foreground)] whitespace-pre-wrap text-lg">
                    {selectedPost.content}
                  </p>
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                  <h3 className="text-[var(--foreground)] font-semibold mb-4">
                    Comments ({selectedPost.comments.length})
                  </h3>

                  <div className="space-y-4 mb-4">
                    {selectedPost.comments.length === 0 ? (
                      <p className="text-[var(--muted-foreground)] text-sm text-center py-4">
                        No comments yet. Be the first to comment!
                      </p>
                    ) : (
                      selectedPost.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="size-8 ring-2 ring-zinc-700">
                            <AvatarImage
                              src={comment.author.image || undefined}
                              alt={comment.author.name || comment.author.email}
                            />
                            <AvatarFallback className="bg-[var(--muted)] text-[var(--foreground)] text-xs">
                              {getUserInitials(comment.author.name, comment.author.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[var(--foreground)] font-medium text-sm">
                                {comment.author.name || comment.author.email}
                              </span>
                              <span className="text-[var(--muted-foreground)] text-xs">
                                {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-[var(--foreground)] text-sm whitespace-pre-wrap">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {session?.user && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddComment(selectedPost.id);
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Write a comment..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="flex-1 bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                        disabled={isSubmittingComment}
                      />
                      <Button
                        type="submit"
                        disabled={!commentContent.trim() || isSubmittingComment}
                        className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                      >
                        {isSubmittingComment ? (
                          "Posting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Comment
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
