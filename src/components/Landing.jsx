import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaUsers,
  FaShieldAlt,
  FaChartBar,
  FaRocket,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white text-center py-24 px-6">
        <motion.h1
          className="text-5xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Inventory Management System
        </motion.h1>
        <motion.p
          className="mt-6 text-lg max-w-xl mx-auto opacity-90"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Streamline your inventory with efficiency and precision using our
          powerful management system.
        </motion.p>
        <motion.button
          className="mt-8 bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-8 text-center bg-white">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-gray-700 max-w-3xl mx-auto text-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          InventoryMaster is your go-to solution for managing stock
          effortlessly. Designed with businesses in mind, our system ensures
          real-time tracking, security, and ease of use.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="bg-gray-200 py-20 px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Features
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="text-5xl text-blue-700 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-700 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-blue-800 text-white">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Optimize Your Inventory?
        </motion.h2>
        <motion.button
          className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/login")}
        >
          Sign Up Now
        </motion.button>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Easy Stock Management",
    description: "Track your inventory with ease and accuracy.",
    icon: FaBoxOpen,
  },
  {
    title: "User Roles & Permissions",
    description: "Secure access control for admins and users.",
    icon: FaUsers,
  },
  {
    title: "Data Security",
    description: "Your data is encrypted and protected.",
    icon: FaShieldAlt,
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize trends and insights in real time.",
    icon: FaChartBar,
  },
  {
    title: "Fast & Responsive",
    description: "Seamless user experience on all devices.",
    icon: FaRocket,
  },
];

export default Landing;
