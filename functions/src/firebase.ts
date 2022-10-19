import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const onQuestionCreation = functions.firestore.document("questions/{questionId")
    .onCreate(async (snapshot, context) => {
      return await snapshot.ref.set({uid: context.auth?.uid}, {merge: true});
    });

export {onQuestionCreation};
