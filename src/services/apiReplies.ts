import { newReply, reply, replyVote } from "@/types/allTypes";
import { BACKEND_URL } from "@/utils/constants";

export async function getReplies(parentId: number): Promise<reply[]> {
  const response = await fetch(`${BACKEND_URL}/posts/${parentId}/replies`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get replies");
  const replies = await response.json();
  return replies;
}

export async function getAllReplies(): Promise<reply[]> {
  const response = await fetch(`${BACKEND_URL}/replies`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get replies");
  const replies = await response.json();
  return replies;
}

export async function createReply(newReply: newReply): Promise<void> {
  const formData = new FormData();
  // Append other fields
  formData.append("ParentId", String(newReply.parentId));
  formData.append("CreatedAt", newReply.CreatedAt);
  formData.append("Content", newReply.content);
  formData.append("imagesUrl", newReply.imagesUrl);
  const response = await fetch(
    `${BACKEND_URL}/posts/${newReply.parentId}/replies`,
    {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: formData,
    }
  );
  if (!response.ok) throw new Error("Failed to create reply");
}

export async function editReply({
  replyId,
  newReply,
}: {
  replyId: number;
  newReply: newReply;
}): Promise<void> {
  const response = await fetch(
    `${BACKEND_URL}/posts/${newReply.parentId}/replies/${replyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newReply),
    }
  );
  if (!response.ok) throw new Error("Failed to edit reply");
}

export async function deleteReply({
  replyId,
  parentId,
}: {
  replyId: number;
  parentId: number;
}): Promise<void> {
  const response = await fetch(
    `${BACKEND_URL}/posts/${parentId}/replies/${replyId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to delete reply");
}

export async function voteReply(newReplyVote: replyVote): Promise<void> {
  const replyId = newReplyVote.replyId;
  const response = await fetch(`${BACKEND_URL}/replies/${replyId}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newReplyVote),
  });

  if (!response.ok) throw new Error("Failed to like reply");
}

export async function getReplyVotes(replyId: number): Promise<replyVote[]> {
  const response = await fetch(`${BACKEND_URL}/replies/${replyId}/votes`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get reply votes");
  const replyVotes = await response.json();
  return replyVotes.totalVotes;
}

export async function getAllReplyVotes(): Promise<replyVote[]> {
  const response = await fetch(`${BACKEND_URL}/replyvotes`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to get reply votes");
  const replyVotes = await response.json();
  return replyVotes.totalVotes;
}

export async function updateReplyVote(newReplyVote: replyVote): Promise<void> {
  const replyId = newReplyVote.replyId;
  const response = await fetch(`${BACKEND_URL}/replies/${replyId}/votes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newReplyVote),
  });
  if (!response.ok) throw new Error("Failed to update reply");
}

export async function deleteReplyVote(replyId: number): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/replies/${replyId}/votes`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete reply");
}
