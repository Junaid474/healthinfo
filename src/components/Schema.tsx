import React from 'react';

type SchemaProps = {
  type: 'Article' | 'MedicalWebPage' | 'Organization' | 'Person';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
};

const Schema: React.FC<SchemaProps> = ({ type, data }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default Schema;
