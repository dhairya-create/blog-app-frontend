import api from "./api";

/**
 * Get a single post by ID
 */
export const getPostById = (id: string) => {
  return api.get(`/post/${id}`);
};

/**
 * Update a post (author only)
 */
export const updatePost = (
  id: string,
  payload: {
    title: string;
    content: string;
  }
) => {
  return api.put(`/post/${id}`, payload);
};

/**
 * Delete a post (author only)
 */
export const deletePost = (id: string) => {
  return api.delete(`/post/${id}`);
};


export const createPost = (data: FormData) => {
  return api.post("/post", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

