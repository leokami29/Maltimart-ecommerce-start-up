import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'

const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        //====== firebase firestore realtime data update ======
        const getData = async () => {
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)

            })
        }
        getData()
    }, )//cuidado


    return { data, loading }
}

export default useGetData