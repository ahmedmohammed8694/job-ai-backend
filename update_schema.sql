-- Update existing applications table schema with new columns
ALTER TABLE applications ADD COLUMN salary TEXT;
ALTER TABLE applications ADD COLUMN email TEXT;
ALTER TABLE applications ADD COLUMN phone TEXT;
ALTER TABLE applications ADD COLUMN jdText TEXT;
ALTER TABLE applications ADD COLUMN coverLetter TEXT DEFAULT 'No generated';
ALTER TABLE applications ADD COLUMN whatsAppMessage TEXT DEFAULT 'No generated';
ALTER TABLE applications ADD COLUMN emailMessage TEXT DEFAULT 'No generated';
ALTER TABLE applications ADD COLUMN atsScore INTEGER;
