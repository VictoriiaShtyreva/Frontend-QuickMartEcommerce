import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//mock data
const sections = [
  {
    title: "About Us",
    description: "Learn more about our company, mission, and values.",
  },
  {
    title: "Customer Care",
    description: "We are dedicated to providing exceptional customer care.",
  },
  {
    title: "Delivery",
    description: "We offer fast and reliable delivery options.",
  },
  {
    title: "Contact Us",
    description: "Reach out to us for assistance or inquiries.",
  },
  {
    title: "Shipping Information",
    description:
      "Learn about our shipping options, delivery times, and policies.",
  },
  {
    title: "Return Policy",
    description:
      "Find out about our return policy and how to initiate a return.",
  },
  {
    title: "FAQs",
    description:
      "Get answers to frequently asked questions about our products and services.",
  },
];

const AboutUs = () => {
  return (
    <Container sx={{ minHeight: "100vh", p: 2 }}>
      <Grid container spacing={2}>
        {sections.map((section) => (
          <Grid key={section.title} item xs={12} md={6}>
            <Accordion sx={{ boxShadow: 3 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography variant="h5">{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CardContent>
                  <Typography variant="body1">{section.description}</Typography>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
