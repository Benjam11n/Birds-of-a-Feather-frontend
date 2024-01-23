import { post, newPost, postVote } from "../types/allTypes";

export async function getPosts() {
  const response = await fetch("http://localhost:8080/posts", {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get posts");
  const posts: post[] = await response.json();
  return posts;
}

export async function getPost(postId: number) {
  const response = await fetch(`http://localhost:8080/posts/${postId}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get post");
  const post: post = await response.json();
  return post;
}

export async function createPost(newPost: newPost) {
  const formData = new FormData();
  // Append all fields
  formData.append("Title", newPost.title);
  formData.append("CreatedAt", newPost.CreatedAt);
  formData.append("CommunityId", String(newPost.communityId));
  formData.append("Tags", newPost.tags);
  formData.append("Content", newPost.content);
  formData.append("imagesUrl", newPost.imagesUrl);
  const response = await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create post");
}

export async function editPost({
  id,
  newPost,
}: {
  id: number;
  newPost: newPost;
}) {
  const response = await fetch(`http://localhost:8080/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) throw new Error("Failed to edit post");
}
export async function deletePost(id: number) {
  const response = await fetch(`http://localhost:8080/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete post");
}

export async function votePost(postVote: postVote) {
  const id = postVote.postId;

  const response = await fetch(`http://localhost:8080/posts/${id}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(postVote),
  });
  if (!response.ok) throw new Error("Failed to like post");
}

export async function getPostVotes(id: number): Promise<postVote[]> {
  const response = await fetch(`http://localhost:8080/posts/${id}/votes`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get post votes");
  const postVotes = await response.json();
  return postVotes.votes;
}

export async function getAllPostVotes(): Promise<postVote[]> {
  const response = await fetch(`http://localhost:8080/postvotes`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get post votes");
  const postVotes = await response.json();
  return postVotes.votes;
}

export async function updatePostVote({
  id,
  postVote,
}: {
  id: number;
  postVote: postVote;
}) {
  const response = await fetch(`http://localhost:8080/posts/${id}/votes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(postVote),
  });
  if (!response.ok) throw new Error("Failed to update post");
}

export async function deletePostVote(id: number) {
  const response = await fetch(`http://localhost:8080/posts/${id}/votes`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete post");
}
