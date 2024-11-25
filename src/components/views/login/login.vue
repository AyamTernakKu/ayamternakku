<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      const url = "https://farmmonitoring-7f23543656d8.herokuapp.com/login";
      const requestBody = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const error = await response.json();
          // Display SweetAlert error message
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: error.message || "Invalid email or password",
          });
          return;
        }

        const data = await response.json();

        // Display SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${data.user.nama}`,
        }).then(() => {
          // Save token to localStorage
          localStorage.setItem("userToken", data.token);
          // Redirect to dashboard
          this.$router.push("/dashboard");
        });
      } catch (error) {
        // Display SweetAlert error message for network errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
        console.error("Error:", error);
      }
    },
  },
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-lg font-medium text-gray-600 mb-1">
        Please enter your details
      </h2>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Welcome back</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?
        <a href="/register" class="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  </div>
</template>
