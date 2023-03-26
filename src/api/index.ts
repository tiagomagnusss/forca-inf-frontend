export async function login(token: string) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

type AssessmentBody = {
  title: string;
  comment: string;
  grade: "A" | "B" | "C" | "D" | "FF";
  semester: string;
  owner: string;
  subject: string;
  teacher: string;
};

export async function createAssessment(body: AssessmentBody) {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/assessments`, {
      method: "POST",
      headers: {
        Authentication: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getSearchResult(type: "teachers" | "subjects") {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${type}`, {
      mode: "cors",
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
}
