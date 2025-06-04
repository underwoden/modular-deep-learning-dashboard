import time
import threading

def cpu_stress(duration_seconds=10):
    print(f"[Stress Test] Running CPU stress for {duration_seconds} seconds...")
    end_time = time.time() + duration_seconds

    def burn():
        while time.time() < end_time:
            _ = sum(i*i for i in range(10000))  # Just enough to spike CPU

    threads = [threading.Thread(target=burn) for _ in range(4)]  # Can adjust thread count
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    print("[Stress Test] CPU stress complete.")
