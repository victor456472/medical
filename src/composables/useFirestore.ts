import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const useFirestore = () => {
    const getCollection = async(path: string) => {
        //const reference = await getReference('collection', path);
        const querySnapshot = await getDocs(collection(db, path))
        const records: any[] = []
        querySnapshot.forEach((doc: any) => {
            const props = doc.data()
            records.push(props)
            
        });
        return records
    }
    
    const addDocument = async(path: string, document: Record<string, any>)=>{
        //const reference = await getDocs(collection(db, path))
        return await addDoc(collection(db, path), document)
    }

    return {
        getCollection,
        addDocument,
    }
}