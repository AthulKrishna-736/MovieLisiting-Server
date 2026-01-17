import 'reflect-metadata';
import './containers/containers';
import app from "./app";
import { CONFIGS } from "./constants/config";

app.listen(CONFIGS.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${CONFIGS.PORT}`);
});
