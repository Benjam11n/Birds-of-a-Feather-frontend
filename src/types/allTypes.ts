export interface follow {
  ID: number;
  followerId: number;
  followeeId: number;
  CreatedAt: string;
}

export interface post {
  ID: number;
  userId: number;
  communityId: number;
  title: string;
  content: string;
  CreatedAt: string;
  edited: boolean;
  views: number;
  votes: number;
  tags: string;
  imagesUrl: File | string;
  [key: string]: number | string | boolean | File;
}

export interface reply {
  ID: number;
  content: string;
  userId: number;
  parentId: number;
  imagesUrl: string;
  CreatedAt: string;
  views: number;
  votes: number;
  edited: boolean;
}

export interface users {
  ID: number;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  CreatedAt: string;
  userBio: string;
}

export interface newUser {
  ID: number;
  name: string;
  email: string;
  avatarUrl: string;
  userBio: string;
}

export interface newUserAvatar {
  ID: number;
  avatarUrl: File;
}

export interface newUserPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface newPost {
  communityId: number;
  title: string;
  content: string;
  imagesUrl: File | string;
  CreatedAt: string;
  tags: string;
}

export interface newReply {
  content: string;
  parentId: number;
  imagesUrl: File | string;
  CreatedAt: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  name: string;
  email: string;
  password: string;
}

export interface postVote {
  postId: number;
  userId: number;
  voteValue: number;
  CreatedAt: string;
}

export interface newPostVote {
  postId: number;
  userId: number;
  voteValue: number;
}

export interface replyVote {
  replyId: number;
  userId: number;
  voteValue: number;
  CreatedAt: string;
}

export interface community {
  ID: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  iconUrl: File;
  CreatedAt: string;
}

export interface newCommunity {
  title: string;
  description: string;
  category: string;
  iconUrl: File | string;
  CreatedAt: string;
}

export interface communityMember {
  userId: number;
  communityId: number;
}
