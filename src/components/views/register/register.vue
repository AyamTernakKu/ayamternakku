<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-lg font-medium text-gray-600 mb-1">
        Please fill in your details
      </h2>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Create an account</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Phone Input -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            v-model="phone"
            type="text"
            id="phone"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
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
          Register
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Do you have an account?
        <a href="/login" class="text-blue-500 hover:underline">Log in</a>
      </p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleRegister() {
      const url = "https://farmmonitoring-7f23543656d8.herokuapp.com/regis";
      const requestBody = {
        nama: this.name,
        no_telp: this.phone,
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
            title: "Registration failed",
            text: error.message || "Please check your details and try again.",
          });
          return;
        }

        const data = await response.json();
        // Display SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created!",
        }).then(() => {
          // Redirect to login page or dashboard
          this.$router.push("/login");
        });
      } catch (error) {
        // Display SweetAlert error message for network errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again later.",
        });
        console.error("Error:", error);
      }
    },
  },
};
</script>
