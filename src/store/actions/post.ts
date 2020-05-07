import * as types from "../types";
import { IPost } from "@interfaces/post";

export const setPost = (post: IPost) => dispatch => {
	dispatch({
		type: types.post.SET_POST,
		post,
	});
};
