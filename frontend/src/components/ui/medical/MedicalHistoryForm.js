// MedicalHistoryForm.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function MedicalHistoryForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    diagnosis: "",
    symptoms: "",
    prescription: "",
    tests: "",
    nextAppointment: "",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input
          id="diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="symptoms">Symptoms</Label>
        <Textarea
          id="symptoms"
          value={formData.symptoms}
          onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="prescription">Prescribed Medicines</Label>
        <Textarea
          id="prescription"
          value={formData.prescription}
          onChange={(e) => setFormData({...formData, prescription: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="tests">Suggested Tests</Label>
        <Textarea
          id="tests"
          value={formData.tests}
          onChange={(e) => setFormData({...formData, tests: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="nextAppointment">Next Appointment</Label>
        <Input
          id="nextAppointment"
          type="date"
          value={formData.nextAppointment}
          onChange={(e) => setFormData({...formData, nextAppointment: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>
      <Button type="submit">Save Medical Record</Button>
    </form>
  );
}



