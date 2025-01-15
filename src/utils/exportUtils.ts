import { utils, writeFile } from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Booking } from '../types';

export const exportToExcel = (bookings: Booking[]) => {
  const worksheet = utils.json_to_sheet(
    bookings.map(booking => ({
      'Booking ID': booking.id,
      'Student ID': booking.studentId,
      'Hostel': booking.hostelId,
      'Room': booking.roomId,
      'Check In': format(new Date(booking.checkInDate), 'PP'),
      'Check Out': format(new Date(booking.checkOutDate), 'PP'),
      'Status': booking.status,
      'Payment Status': booking.paymentStatus,
      'Amount': `KSH ${booking.amount.toLocaleString()}`
    }))
  );

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Bookings');
  writeFile(workbook, 'booking_history.xlsx');
};

export const exportToPDF = (bookings: Booking[]) => {
  const doc = new jsPDF();

  const tableData = bookings.map(booking => [
    booking.id,
    booking.studentId,
    booking.hostelId,
    booking.roomId,
    format(new Date(booking.checkInDate), 'PP'),
    format(new Date(booking.checkOutDate), 'PP'),
    booking.status,
    booking.paymentStatus,
    `KSH ${booking.amount.toLocaleString()}`
  ]);

  autoTable(doc, {
    head: [['ID', 'Student', 'Hostel', 'Room', 'Check In', 'Check Out', 'Status', 'Payment', 'Amount']],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 51, 102] }
  });

  doc.save('booking_history.pdf');
};