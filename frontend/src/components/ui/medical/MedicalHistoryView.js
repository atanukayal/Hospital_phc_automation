// MedicalHistoryView.js
export function MedicalHistoryView({ records }) {
  if (!records?.length) {
    return <p>No medical history available.</p>;
  }

  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      {records.map((record, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Visit Date: {new Date(record.date).toLocaleDateString()}
            </h3>
            <span className="text-sm text-muted-foreground">
              Dr. {record.doctorName}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="space-y-2">
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Symptoms:</strong> {record.symptoms}</p>
            <p><strong>Prescribed Medicines:</strong> {record.prescription}</p>
            <p><strong>Suggested Tests:</strong> {record.tests}</p>
            <p><strong>Next Appointment:</strong> {record.nextAppointment}</p>
            {record.notes && (
              <p><strong>Additional Notes:</strong> {record.notes}</p>
            )}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}