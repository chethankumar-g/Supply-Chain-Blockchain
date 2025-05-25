const API_BASE = "http://localhost:5000/api";

export async function onboardParticipant(address, name, role) {
    const res = await fetch(`${API_BASE}/participant/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, name, role }),
    });
    return res.json();
}

export async function uploadCertification(file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/certification/upload`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}

export async function addProduct(batchId, ipfsHash, producer) {
    const res = await fetch(`${API_BASE}/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, ipfsHash, producer }),
    });
    return res.json();
}

export async function getProduct(batchId) {
    const res = await fetch(`${API_BASE}/product/${batchId}`);
    return res.json();
}

export async function getUnverifiedProducts() {
    const res = await fetch(`${API_BASE}/admin/unverified-products`);
    const data = await res.json();
    return data.count;
}

export async function getSourcingGaps() {
    const res = await fetch(`${API_BASE}/admin/sourcing-gaps`);
    const data = await res.json();
    return data.gaps;
}

export async function getParticipantComplianceScores() {
    const res = await fetch(`${API_BASE}/admin/compliance-scores`);
    const data = await res.json();
    return data.scores;
}