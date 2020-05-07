import * as types from "../types";
import { IPost } from "@interfaces/post";

const post = (state: IPost[] = [], action) => {
	switch (action.type) {
		case types.post.SET_POST:
			return;
		default:
			return state;
	}
};

export { post };
