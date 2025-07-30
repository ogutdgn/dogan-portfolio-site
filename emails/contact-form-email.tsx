import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactFormEmail({
  name,
  email,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-xl">
            <Section className="bg-white rounded-lg shadow-sm p-6">
              <Heading className="text-2xl font-bold text-gray-900 mb-4">
                New Contact Form Message
              </Heading>
              
              <Hr className="my-4" />
              
              <Section className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  From:
                </Text>
                <Text className="text-gray-900 mb-3">
                  {name} ({email})
                </Text>
              </Section>
              
              <Section className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  Subject:
                </Text>
                <Text className="text-gray-900 mb-3">
                  {subject}
                </Text>
              </Section>
              
              <Section className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  Message:
                </Text>
                <div className="bg-gray-50 p-4 rounded-md">
                  <Text className="text-gray-900 whitespace-pre-wrap">
                    {message}
                  </Text>
                </div>
              </Section>
              
              <Hr className="my-4" />
              
              <Text className="text-xs text-gray-500 text-center">
                This message was sent by {name} from your portfolio website.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
