import { useEffect, useState } from 'react';
import { ref, runTransaction, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

export function useVisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!database) {
      setLoading(false);
      return;
    }

    const visitorRef = ref(database, 'visitors/total');

    runTransaction(visitorRef, (current) => {
      return (current || 0) + 1;
    }).catch((error) => {
      console.error('Failed to increment visitor count:', error);
    });

    const unsubscribe = onValue(visitorRef, (snapshot) => {
      setCount(snapshot.val() || 0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { count, loading };
}

export function useQuizParticipants(quizId: string) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!database || !quizId) {
      setLoading(false);
      return;
    }

    const participantRef = ref(database, `quizzes/${quizId}/participants`);

    const unsubscribe = onValue(participantRef, (snapshot) => {
      setCount(snapshot.val() || 0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [quizId]);

  return { count, loading };
}

export function incrementQuizParticipants(quizId: string) {
  if (!database || !quizId) return Promise.resolve();

  const participantRef = ref(database, `quizzes/${quizId}/participants`);

  return runTransaction(participantRef, (current) => {
    return (current || 0) + 1;
  }).catch((error) => {
    console.error('Failed to increment quiz participants:', error);
  });
}
