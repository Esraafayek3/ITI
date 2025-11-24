import { useForm } from "react-hook-form";

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("✅ Form submitted successfully!");
  };

  const password = watch("password");

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create an Account</h2>
        <p style={styles.subtitle}>Join us and start your journey today </p>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          {/* First Name */}
          <div style={styles.field}>
            <label style={styles.label}>First Name</label>
            <input
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "First name must contain only letters",
                },
              })}
              type="text"
              placeholder="Enter your first name"
              style={styles.input}
            />
            {errors.firstName && (
              <p style={styles.error}>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div style={styles.field}>
            <label style={styles.label}>Last Name</label>
            <input
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Last name must contain only letters",
                },
              })}
              type="text"
              placeholder="Enter your last name"
              style={styles.input}
            />
            {errors.lastName && (
              <p style={styles.error}>{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              style={styles.input}
            />
            {errors.email && (
              <p style={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
              style={styles.input}
            />
            {errors.password && (
              <p style={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm your password"
              style={styles.input}
            />
            {errors.confirmPassword && (
              <p style={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ CSS in JS (inline style)
const styles = {
  wrapper: {
    fontfamily: "'sans-serif', Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "40px 35px",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#e63946",
    fontSize: "13px",
    marginTop: "4px",
  },
  button: {
    background: "linear-gradient(135deg, #4A90E2, #7B4397)",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
};

// hover effect (optional in CSS file)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  if (btn) {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "none";
    });
  }
});
