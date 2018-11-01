import { firestore } from "./firebase"

class Updater {
  async getSpecificDoc(id) {
    const document = await firestore
      .collection("messages")
      .doc("Lt1p6cIVbo7IHaqU57hO")
      .get()
    return document.data()
  }

  async getCollection(collection) {
    const document = await firestore.collection(collection).get()
    if (!document.empty) {
      return document.docs.map(doc => doc.data())
    }
    return []
  }

  subscribeTo(collection, setListenerCallback, callback) {
    const listener = firestore.collection(collection).onSnapshot(snapshot => {
      if (!snapshot.empty) {
        callback(snapshot.docs.map(doc => doc.data()))
      }
    })
    if (setListenerCallback) setListenerCallback(listener)
  }

  async addToCollection(collection, payload) {
    await firestore
      .collection(collection)
      .doc()
      .set(payload)
    return true
  }
}

export default Updater