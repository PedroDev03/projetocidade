"use client";
import { useState, useEffect } from "react";

const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(false);
const [pharmacies, setPharmacies] = useState<Lugar[]>([]);