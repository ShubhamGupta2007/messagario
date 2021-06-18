import * as api from "api";
import { Timestamp } from "db";
import {
  COLLABORATION_CREATED_FROM_OFFER,
  FETCH_USER_MESSAGES_SUCCESS,
} from "types";

export const newCollaboration = ({
  offer: { service, time, toUser, id },
  fromUser,
}) => ({
  serviceId: service.id, // define ID on offer.service
  title: service.title,
  image: service.image,
  time: time * 60 * 60,
  allowedPeople: [fromUser.uid, toUser.uid],
  joinedPeople: [],
  toUser: toUser.uid,
  fromUser: fromUser.uid,
  fromOffer: id,
  createdAt: Timestamp.fromDate(new Date()),
});

export const newMessage = ({ offer: { service, toUser }, fromUser }) => ({
  isRead: false,
  type: "invitation",
  text: `Hello ${toUser.fullName}, please join collaboration as soon as possible`,
  cta: "", // click to action
  toUser: toUser.uid,
  fromUser: {
    name: fromUser.fullName,
    avatar: fromUser.avatar,
  },
  serviceTitle: service.title,
  serviceLink: `/services/${service.id}`,
  createdAt: Timestamp.fromDate(new Date()),
});

export const collaborate = ({ collaboration, message }) => (dispatch) =>
  api.createCollaboration(collaboration).then((collabId) => {
    message.cta = `/collaborations/${collabId}`;
    api.sendMessage(message);
    api.markOfferAsInCollaboration(collaboration.fromOffer);
    dispatch({
      type: COLLABORATION_CREATED_FROM_OFFER,
      offerId: collaboration.fromOffer,
      offersType: "sent",
    });
    return collabId;
  });

export const subscribeToMessages = (userId) => (dispatch) =>
  api.subscribeToMessages(userId, (messages) =>
    dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages })
  );

export const markMessageAsRead = (message) => api.markMessageAsRead(message);
