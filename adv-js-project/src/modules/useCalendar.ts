import { ref, onMounted } from 'vue';
import { getDocs } from 'firebase/firestore';
import { calendarDaysCollection } from './firebase';

interface CalendarDay {
    id: string;
    date: number;
}

export function useCalendar() {

    const calendarDays = ref<CalendarDay[]>([]);
    const dayDate = ref('');

    const fetchCalendarDays = async () => {
        try{
        const daysSnapshot = await getDocs(calendarDaysCollection);
        calendarDays.value = daysSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data().date, // Adjust based on actual fields in your document
        }));
        }
        catch (error) {
            console.error("Error fetching:", error);
        }
    };

    onMounted(() => {
        fetchCalendarDays();
    });

    return {
        calendarDays,
        dayDate
    }
}

