let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let output = document.querySelector(".output"); // updated

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.");
    return raw.json();
  });
}

function decorateProfileData(details) {
  let data = `<img
      src="${details.avatar_url}"
      alt="User Avatar"
      class="w-24 h-24 rounded-full border-2 border-gray-300"
    />
    <div>
      <h2 class="text-2xl font-semibold text-gray-800">${details.name || "No Name Found"}</h2>
      <p class="text-gray-500">@${details.login}</p>
      <a
        href="${details.html_url}"
        target="_blank"
        class="text-blue-600 hover:underline text-sm"
        >View GitHub Profile</a
      >
    </div>

    <div class="mt-6 space-y-3">
      <p class="text-gray-700">
        <span class="font-medium text-gray-900">Bio:</span>
        ${details.bio || "Sorry there is no bio..."}
      </p>
      <p class="text-gray-700">
        <span class="font-medium text-gray-900">Company:</span> ${details.company || "N/A"}
      </p>
      <p class="text-gray-700">
        <span class="font-medium text-gray-900">Location:</span> ${details.location || "N/A"}
      </p>
      <p class="text-gray-700">
        <span class="font-medium text-gray-900">Blog:</span>
        <a
          href="${details.blog || "#"}"
          target="_blank"
          class="text-blue-600 hover:underline"
          >${details.blog || "N/A"}</a
        >
      </p>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-6 text-center">
      <div>
        <h3 class="text-gray-700 font-medium">Repos</h3>
        <p class="text-xl font-bold text-gray-900">${details.public_repos}</p>
      </div>
      <div>
        <h3 class="text-gray-700 font-medium">Followers</h3>
        <p class="text-xl font-bold text-gray-900">${details.followers}</p>
      </div>
      <div>
        <h3 class="text-gray-700 font-medium">Following</h3>
        <p class="text-xl font-bold text-gray-900">${details.following}</p>
      </div>
    </div>`;

  output.innerHTML = data; // updated
}

searchBtn.addEventListener("click", function () {
  let username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username)
      .then(function (data) {
        decorateProfileData(data);
      })
      .catch(function (err) {
        output.innerHTML = `<p class="text-red-500 font-semibold">User not found.</p>`;
        console.error(err);
      });
  } else {
    alert("Please enter a GitHub username");
  }
});
