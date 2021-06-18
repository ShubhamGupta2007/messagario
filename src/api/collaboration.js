import db from "db";

export const createCollaboration = (collab) =>
  db
    .collection("collaborations")
    .add(collab)
    .then((docRef) => docRef.id);

export const sendMessage = (message) =>
  db
    .collection("profiles")
    .doc(message.toUser)
    .collection("messages")
    .add(message);

export const markOfferAsInCollaboration = (offerId) =>
  db.collection("offers").doc(offerId).update({ collaborationCreated: true });

export const subscribeToMessages = (userId, dispatch) =>
  db
    .collection("profiles")
    .doc(userId)
    .collection("messages")
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(messages);
      return messages;
    });

export const markMessageAsRead = (message) =>
  db
    .collection("profiles")
    .doc(message.toUser)
    .collection("messages")
    .doc(message.id)
    .update({ isRead: true });
