import React, { useState } from 'react';
import axios from 'axios';

function TestApis() {
    const [api, setApi] = useState("");
    const [response, setResponse] = useState("");
    const [requestBody, setRequestBody] = useState("{}");

    const submit = async (e) => {

        try {

            if (!api.trim()) {
                setResponse("Error: API name is required");
                return;
            }

            e.preventDefault();

            const res = await axios.get(
                "http://localhost:7000/admin/get-apis"
            );

            setResponse(JSON.stringify(res.data, null, 2));
        } catch (error) {
            console.log(error);
            setResponse(`Error: ${error.message}`);
        }

    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
            <div className="w-[600px] bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

                <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Client - API Tester
                </h1>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        API Name
                    </label>
                    <input
                        type="text"
                        placeholder="API NAME"
                        value={api}
                        onChange={(e) => setApi(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Response
                    </label>
                    <textarea
                        value={response}
                        rows={10}
                        placeholder=""
                        className="border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        onClick={submit}
                        className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">
                        Execute
                    </button>

                    <button className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                        Clear
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TestApis;
